import { ContentCopy, Home, InfoOutlined, Search } from "@mui/icons-material";
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  Checkbox,
  Chip,
  IconButton,
  Input,
  Link,
  Sheet,
  Table,
  Typography,
} from "@mui/joy";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  changeResourceType,
  fetchSchedulerData,
} from "../../redux/actions/schedulerActions";
import SavingsBarChart from "../charts/SavingsBarChart";
import Loader from "../Loader";

const ResourceSchedulerDashboard = ({
  loading,
  resourceType,
  coverage,
  spending,
  savings,
  dailySavings,
  resources,
  fetchSchedulerData,
  changeResourceType,
}) => {
  const [selectedResources, setSelectedResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const resourceTypes = ["EC2", "ASG", "RDS"];

  useEffect(() => {
    fetchSchedulerData(resourceType);
  }, []);

  const handleResourceTypeChange = (type) => {
    changeResourceType(type);
    setSelectedResources([]);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedResources(resources.map((r) => r.id));
    } else {
      setSelectedResources([]);
    }
  };

  const handleSelectResource = (id) => {
    if (selectedResources.includes(id)) {
      setSelectedResources(selectedResources.filter((rid) => rid !== id));
    } else {
      setSelectedResources([...selectedResources, id]);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const filteredResources = resources.filter(
    (resource) =>
      resource.resourceName
        .toLowerCase()
        .includes(searchTerm.toLocaleLowerCase()) ||
      resource.resourceId
        .toLowerCase()
        .includes(searchTerm.toLocaleLowerCase()) ||
      resource.accountId.includes(searchTerm)
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={{ p: 3, bgcolor: "#f9fafb", minHeight: "100vh" }}>
      {/* breadcrum */}
      {/* <Box sx={{ mb: 2 }}>
        <Breadcrumbs separator=">">
          {["Home", "Scheduler", "Resource Based Scheduler", resourceType].map(
            (item) => (
              <Link key={item} color="neutral" href="#">
                {" "}
                {item}{" "}
              </Link>
            )
          )}
        </Breadcrumbs>
      </Box> */}

      {/* Header */}

      <Typography level="h2" sx={{ fontWeight: 600, fontSize: "24" }}>
        Resource Based Scheduler
      </Typography>

      {/* Resource type tabs */}
      <Box sx={{ display: "flex", mb: 3 }}>
        {resourceTypes.map((type) => (
          <Button
            key={type}
            variant={resourceType === type ? "solid" : "outlined"}
            onClick={() => handleResourceTypeChange(type)}
            sx={{
              bgcolor: resourceType === type ? "#2563eb" : "transparent",
              color: resourceType === type ? "white" : "#374151",
              borderColor: "#d1d5db",
              "&:hover": {
                bgcolor: resourceType === type ? "#1d4ed8" : "#f3f4f6",
              },
              borderRadius: "0px",
              px: 3,
              py: 1,
            }}
          >
            {type}
          </Button>
        ))}
      </Box>

      {/* Savings and Spends Analysis */}
      <Card variant="outlined" sx={{ borderRadius: "8px", mb: 3 }}>
        <Box p={3}>
          <Typography level="h4" sx={{ fontWeight: 600, mb: 2 }}>
            Savings and Spends Analysis
          </Typography>

          {dailySavings.length > 0 ? (
            <>
              <SavingsBarChart data={dailySavings} />

              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      bgcolor: "#5eead4",
                      borderRadius: "50%",
                    }}
                  ></Box>
                  <Typography level="body-sm">Saving</Typography>
                </Box>
              </Box>
            </>
          ) : (
            <Box sx={{ py: 8, textAlign: "center" }}>
              <Typography level="body-md" color="#6b7280">
                No Data Available
              </Typography>
            </Box>
          )}
        </Box>
      </Card>

      {/* Resource table */}

      <Card variant="outlined" sx={{ borderRadius: "8px" }}>
        <Box p={3}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography level="h4" fontWeight={600}>
                Resources
              </Typography>
              <IconButton size="sm" variant="plain">
                <InfoOutlined fontSize="16" color="#9ca3af" />
              </IconButton>
            </Box>

            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Button variant="outlined" size="sm" sx={{ borderRadius: "6px" }}>
                Actions
              </Button>
              <Input
                placeholder="Search"
                startDecorator={<Search />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{
                  width: 200,
                }}
              />
            </Box>
          </Box>

          <Sheet sx={{ overflow: "auto" }}>
            <Table
              stickyHeader
              sx={{
                "--TableCell-headBackground": "transparent",
              }}
            >
              <thead>
                <tr
                  style={{ backgroundColor: "#2563eb", alignItems: "center" }}
                >
                  <th style={{ width: 50, padding: "12px", color: "white" }}>
                    <Checkbox
                      checked={
                        selectedResources.length === resources.length &&
                        resources.length > 0
                      }
                      indeterminate={
                        selectedResources.length > 0 &&
                        selectedResources.length < resources.length
                      }
                      onChange={handleSelectAll}
                    />
                  </th>

                  <th
                    style={{ padding: "12px", color: "white", fontWeight: 600 }}
                  >
                    Account ID
                  </th>
                  <th
                    style={{ padding: "12px", color: "white", fontWeight: 600 }}
                  >
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      Resource ID
                      <span style={{ cursor: "pointer" }}>▼</span>
                    </Box>
                  </th>

                  <th
                    style={{ padding: "12px", color: "white", fontWeight: 600 }}
                  >
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      Resource Name
                      <span style={{ cursor: "pointer" }}>▼</span>
                    </Box>
                  </th>
                  <th
                    style={{ padding: "12px", color: "white", fontWeight: 600 }}
                  >
                    Region
                  </th>
                  {resourceType === "ASG" && (
                    <>
                      <th
                        style={{
                          padding: "12px",
                          color: "white",
                          fontWeight: 600,
                        }}
                      >
                        Desired Capacity
                      </th>
                      <th
                        style={{
                          padding: "12px",
                          color: "white",
                          fontWeight: 600,
                        }}
                      >
                        Min Size
                      </th>
                      <th
                        style={{
                          padding: "12px",
                          color: "white",
                          fontWeight: 600,
                        }}
                      >
                        Max Size
                      </th>
                    </>
                  )}
                  <th
                    style={{ padding: "12px", color: "white", fontWeight: 600 }}
                  >
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      Resource Status
                      <span style={{ cursor: "pointer" }}>▼</span>
                    </Box>
                  </th>
                  <th
                    style={{ padding: "12px", color: "white", fontWeight: 600 }}
                  >
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      Potential Savings
                      <span style={{ cursor: "pointer" }}>▼</span>
                    </Box>
                  </th>
                  <th
                    style={{ padding: "12px", color: "white", fontWeight: 600 }}
                  >
                    Enable Scheduler
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredResources.map((resource) => (
                  <tr
                    key={resource.id}
                    style={{ borderBottom: "1px solid #e5e7eb" }}
                  >
                    <td style={{ padding: "12px" }}>
                      <Checkbox
                        checked={selectedResources.includes(resource.id)}
                        onChange={() => handleSelectResource(resource.id)}
                      />
                    </td>
                    <td style={{ padding: "12px" }}>{resource.accountId}</td>
                    <td style={{ padding: "12px" }}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Typography level="body-sm" sx={{ color: "#2563eb" }}>
                          {resource.resourceId}
                        </Typography>
                        <IconButton
                          size="sm"
                          variant="plain"
                          onClick={() => copyToClipboard(resource.resourceId)}
                        >
                          <ContentCopy sx={{ fontSize: 14 }} />
                        </IconButton>
                      </Box>
                    </td>
                    <td style={{ padding: "12px" }}>{resource.resourceName}</td>
                    <td style={{ padding: "12px" }}>{resource.region}</td>
                    {resourceType === "ASG" && (
                      <>
                        <td style={{ padding: "12px", textAlign: "center" }}>
                          {resource.desiredCapacity}
                        </td>
                        <td style={{ padding: "12px", textAlign: "center" }}>
                          {resource.minSize}
                        </td>
                        <td style={{ padding: "12px", textAlign: "center" }}>
                          {resource.maxSize}
                        </td>
                      </>
                    )}
                    <td style={{ padding: "12px" }}>
                      <Chip
                        size="sm"
                        variant="soft"
                        color={
                          resource.status === "RUNNING" ? "success" : "neutral"
                        }
                      >
                        {resource.status}
                      </Chip>
                    </td>
                    <td style={{ padding: "12px", fontWeight: 600 }}>
                      ${resource.potentialSavings.toFixed(2)}
                    </td>
                    <td style={{ padding: "12px" }}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Box
                          sx={{
                            width: 40,
                            height: 20,
                            borderRadius: "10px",
                            bgcolor: resource.enableScheduler
                              ? "#2563eb"
                              : "#d1d5db",
                            position: "relative",
                            cursor: "pointer",
                            transition: "background-color 0.2s",
                          }}
                        >
                          <Box
                            sx={{
                              position: "absolute",
                              top: 2,
                              left: resource.enableScheduler ? 22 : 2,
                              width: 16,
                              height: 16,
                              borderRadius: "50%",
                              bgcolor: "white",
                              transition: "left 0.2s",
                            }}
                          />
                        </Box>
                        {resource.enableScheduler && (
                          <IconButton size="sm" variant="plain">
                            <InfoOutlined
                              sx={{ fontSize: 16, color: "#2563eb" }}
                            />
                          </IconButton>
                        )}
                      </Box>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Sheet>
        </Box>
      </Card>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  loading: state.scheduler.loading,
  resourceType: state.scheduler.resourceType,
  coverage: state.scheduler.coverage,
  spending: state.scheduler.spending,
  savings: state.scheduler.savings,
  dailySavings: state.scheduler.dailySavings,
  resources: state.scheduler.resources,
});

const mapDispatchToProps = {
  fetchSchedulerData,
  changeResourceType,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResourceSchedulerDashboard);
