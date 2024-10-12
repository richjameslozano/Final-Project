import React from 'react';
import { Checkbox, Radio, Button } from 'antd';
import '../css/componentsStyle/Sidebar.css'; // Import the CSS file

const Sidebar = () => (
  <div className="sidebar-container">
    {/* Categories Section */}
    <h3 className="sidebar-heading">Categories</h3>
    <Checkbox.Group className="sidebar-checkbox-group">
      <Checkbox value="Action" className="sidebar-checkbox">Action</Checkbox>
      <Checkbox value="Comedy" className="sidebar-checkbox">Comedy</Checkbox>
      <Checkbox value="History" className="sidebar-checkbox">History</Checkbox>
    </Checkbox.Group>

    {/* Language Section */}
    <h3 className="sidebar-heading">Language</h3>
    <Checkbox.Group className="sidebar-checkbox-group">
      <Checkbox value="English" className="sidebar-checkbox">English</Checkbox>
      <Checkbox value="Spanish" className="sidebar-checkbox">Spanish</Checkbox>
    </Checkbox.Group>

    {/* Time Section */}
    <h3 className="sidebar-heading">Time</h3>
    <Radio.Group className="sidebar-radio-group">
      <Radio value="morning" className="sidebar-radio">Morning</Radio>
      <Radio value="night" className="sidebar-radio">Night</Radio>
    </Radio.Group>

    {/* Apply Filters Button */}
    <Button type="primary" className="sidebar-button">Apply Filters</Button>
  </div>
);

export default Sidebar;
