import { Box, Button, Divider, Sheet, Table, Typography } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../components";
import { CheckCircle, NoAccounts } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { fetchAllAccounts } from "../redux/actions/awsAccountActions";

const AwsAccounts = () => {
  const { accounts, loading } = useSelector((state) => state.awsAccounts);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnboarding = () => {
    navigate("onboarding");
  };

  useEffect(() => {
    dispatch(fetchAllAccounts());
  }, [dispatch]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography level="h3">AWS Accounts</Typography>
        <Button onClick={handleOnboarding}>Onboard New Account</Button>
      </Box>
      <Divider sx={{ my: 2 }} />

      <Sheet
        variant="outlined"
        sx={(theme) => ({
          "--TableCell-height": "40px",
          // the number is the amount of the header rows.
          "--TableHeader-height": "calc(1 * var(--TableCell-height))",
          "--Table-firstColumnWidth": "80px",
          "--Table-lastColumnWidth": "144px",
          // background needs to have transparency to show the scrolling shadows
          "--TableRow-stripeBackground": "rgba(0 0 0 / 0.04)",
          "--TableRow-hoverBackground": "rgba(0 0 0 / 0.08)",
          overflow: "auto",
          background: `linear-gradient(to right, ${theme.vars.palette.background.surface} 30%, rgba(255, 255, 255, 0)),
            linear-gradient(to right, rgba(255, 255, 255, 0), ${theme.vars.palette.background.surface} 70%) 0 100%,
            radial-gradient(
              farthest-side at 0 50%,
              rgba(0, 0, 0, 0.12),
              rgba(0, 0, 0, 0)
            ),
            radial-gradient(
                farthest-side at 100% 50%,
                rgba(0, 0, 0, 0.12),
                rgba(0, 0, 0, 0)
              )
              0 100%`,
          backgroundSize:
            "40px calc(100% - var(--TableCell-height)), 40px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height))",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "local, local, scroll, scroll",
          backgroundPosition:
            "var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height), var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height)",
          backgroundColor: "background.surface",
        })}
      >
        {loading ? (
          <Box height={300} width={"100%"} border={"none"} >
            <Loader />
          </Box>
        ) : (
          <Table
            variant="soft"
            borderAxis="both"
            stickyHeader
            stripe={"even"}
            hoverRow
            sx={{
              "& tr > *:first-child": {
                position: "sticky",
                left: 0,
                boxShadow: "1px 0 var(--TableCell-borderColor)",
                bgcolor: "background.surface",
              },
              "& tr > *:last-child": {
                position: "sticky",
                right: 0,
                bgcolor: "var(--TableCell-headBackground)",
              },
            }}
          >
            <thead>
              <tr>
                <th style={{ width: "var(--Table-firstColumnWidth)" }}>Row</th>
                <th>Account ID</th>
                <th>Account Name</th>
                <th>Role ARN</th>
                <th
                  aria-label="last"
                  style={{ width: "var(--Table-lastColumnWidth)" }}
                >
                  Actions{" "}
                </th>
              </tr>
            </thead>
            <tbody>
              {accounts.length > 0 ? (
                accounts?.map((account, i) => (
                  <tr key={account.id}>
                    <td>{i + 1}</td>
                    <td>{account.accountId}</td>
                    <td>{account.accountAlias}</td>
                    <td>{account.roleArn}</td>
                    <td>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Button size="sm" variant="plain" color="neutral">
                          Edit
                        </Button>
                        <Button size="sm" variant="soft" color="danger">
                          Delete
                        </Button>
                      </Box>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        minHeight: "100px",
                        p: 5,
                      }}
                    >
                      <NoAccounts
                        sx={{ fontSize: 80, color: "secondary", mb: 3 }}
                      />
                      <Typography level="h4" sx={{ mb: 1 }}>
                        No Account Onboarded Yet
                      </Typography>
                      <Typography
                        level="body-sm"
                        sx={{ mb: 4, color: "black", textAlign: "center" }}
                      >
                        No AWS account has connected to CloudBalance.
                      </Typography>
                      <Box sx={{ display: "flex", gap: 2 }}>
                        <Button variant="outlined">Onboard An Account</Button>
                        <Button>Go to Dashboard</Button>
                      </Box>
                    </Box>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </Sheet>
    </>
  );
};

export default AwsAccounts;
