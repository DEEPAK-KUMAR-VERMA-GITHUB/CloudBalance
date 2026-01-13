import { useState } from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import Chart from "./Chart";
import ResourceTable from "../../components/table/ResourceTable";

export default function TabsPlacement() {
  const [resourceType, setResourceType] = useState("ec2");

  return (
    <Tabs
      variant="plain"
      aria-label="Placement indicator tabs"
      value={resourceType}
      onChange={(event, newValue) => setResourceType(newValue)}
    >
      <TabList underlinePlacement={resourceType}>
        <Tab disableIndicator value="ec2" variant="solid" color="primary">
          EC2
        </Tab>
        <Tab disableIndicator value="asg">
          ASG
        </Tab>
        <Tab disableIndicator value="rds">
          RDS
        </Tab>
      </TabList>
      <TabPanel value="ec2">
        <Chart />
        <ResourceTable />
      </TabPanel>
      <TabPanel value="asg">
        underlinePlacement <b>Bottom</b>
      </TabPanel>
      <TabPanel value="rds">
        underlinePlacement <b>Left</b>
      </TabPanel>
    </Tabs>
  );
}
