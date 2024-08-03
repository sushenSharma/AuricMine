import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import _ from "lodash";

const AccordionWrapper = ({ list, className }) => {
  const [dataList, setDataList] = useState([]);
  const [expanded, setExpanded] = React.useState(false);

  useEffect(() => {
    if (!_.isEmpty(list)) {
      setDataList(list);
    }
  }, [list]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  console.log("dataList", dataList);
  const items = !_.isEmpty(dataList)
    ? dataList.map((item) => {
        const { key, label, content } = item;

        return (
          <Accordion
            key={key}
            expanded={expanded === key}
            onChange={handleChange(key)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${key}bh-content`}
              id={`${key}bh-header`}
            >
              <Typography>{label}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{content}</Typography>
            </AccordionDetails>
          </Accordion>
        );
      })
    : null;

  return (
    <div
      className={`accordion-wrapper-container${
        className ? " " + className : ""
      }`}
    >
      {items}
    </div>
  );
};

export default AccordionWrapper;
