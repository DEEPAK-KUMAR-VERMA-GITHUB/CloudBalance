import { Box, Card, Stack } from "@mui/joy";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AccountList from "./AccountList";
import TransferButtons from "./TransferButtons";
import {
  assignUserAccounts,
  fetchUserAssignedAccounts,
  unAssignUserAccounts,
} from "../../redux/actions/userActions";
import { revokeUserAwsAccounts } from "../../apis/services/userServices";

export default function AccountTransfer({ userId }) {
  const dispatch = useDispatch();
  const { accounts: allAccounts } = useSelector((state) => state.awsAccounts);
  const { assignedAccounts: userAssigned = [] } = useSelector(
    (state) => state.userAccounts
  );

  useEffect(() => {
    // Fetch on mount OR when userId changes
    dispatch(fetchUserAssignedAccounts(userId));
  }, [dispatch, userId]);

  const [leftSelected, setLeftSelected] = useState([]);
  const [rightSelected, setRightSelected] = useState([]);

  const available = allAccounts?.filter(
    (a) => !userAssigned.some((b) => b.id === a.id)
  );

  const handleSelect = (set, ids, isSelect) => {
    set((prev) => {
      let updated = [...prev];
      ids.forEach((id) => {
        if (isSelect && !updated.includes(id)) updated.push(id);
        if (!isSelect) updated = updated.filter((x) => x !== id);
      });
      return updated;
    });
  };

  const handleAdd = () => {
    dispatch(assignUserAccounts(userId, leftSelected));
    setLeftSelected([]);
    setRightSelected([]);
  };

  const handleRemove = () => {
    console.log(rightSelected);

    dispatch(unAssignUserAccounts(userId, rightSelected));
    setLeftSelected([]);
    setRightSelected([]);
  };

  return (
    <Stack
      direction={"row"}
      spacing={3}
      justifyContent={"space-evenly"}
      sx={{
        my: 5,
        bgcolor: "white",
        p: 4,
        borderRadius: 4,
        boxShadow: "inherit",
      }}
    >
      <Card width="45%">
        <AccountList
          title={`Choose Account IDs to Associate : `}
          accounts={available}
          selectedIds={leftSelected}
          onSelect={(ids, isSelect) =>
            handleSelect(setLeftSelected, ids, isSelect)
          }
        />
      </Card>

      <TransferButtons
        disabledAdd={!leftSelected.length}
        disabledRemove={!rightSelected.length}
        onAdd={handleAdd}
        onRemove={handleRemove}
      />

      <Card width="45%">
        <AccountList
          title={`Associated Account IDs`}
          accounts={userAssigned}
          selectedIds={rightSelected}
          onSelect={(ids, isSelect) =>
            handleSelect(setRightSelected, ids, isSelect)
          }
        />
      </Card>
    </Stack>
  );
}
