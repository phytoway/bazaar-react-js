import { Card, Checkbox, Divider, FormControlLabel } from "@mui/material";
import { H6, Span } from "components/Typography";

const ProductFilterCard = ({ category, selectedFilters, ableFilters, onChange }) => {
  return (
    <Card sx={{ p: "18px 27px", overflow: "auto" }} elevation={1}>
      {category.map((group) => (
        <div key={group.group}>
          <H6 mb={2}>{group.group}</H6>
          {group.category.map((category) => (
            <FormControlLabel
              key={category.id}
              sx={{ display: "flex" }}
              label={<Span color="inherit">{category.name}</Span>}
              disabled={!ableFilters.includes(category.name)}
              control={
                <Checkbox
                  size="small"
                  color="secondary"
                  name={category.name}
                  checked={selectedFilters.includes(category.name)}
                  onChange={onChange}
                />
              }
            />
          ))}
          <Divider sx={{ my: 3 }} />
        </div>
      ))}
    </Card>
  );
};


export default ProductFilterCard;

/*
import { useCallback, useState } from "react";
import { Box, Card, Checkbox, Divider, FormControlLabel, Rating, TextField } from "@mui/material";
import Accordion from "components/accordion/Accordion";
import { FlexBetween, FlexBox } from "components/flex-box";
import { H5, H6, Paragraph, Span } from "components/Typography";
import AccordionHeader from "components/accordion/AccordionHeader";


const ProductFilterCard = ({ category, onChange }) => {

  const handleChange = useCallback((category_id, is_checked) => {
    onChange({ category_id, is_checked });
  }, [onChange]);
  
  return <Card sx={{
    p: "18px 27px",
    overflow: "auto"
  }} elevation={1}>
      {category.map(group => (
        <div>
        <H6 mb={2}>{group.group}</H6>
        {group.category.map(category => 
          <FormControlLabel
          key={category.id}
          sx={{ display: "flex" }}
          label={<Span color="inherit">{category.name}</Span>}
          control={
            <Checkbox
              size="small"
              color="secondary"
              name={category.name}
              checked={selectedFilters.includes(category.name)}
              onChange={handleFilterChange} 
            />
          }
        />)}
        <Divider sx={{my: 3}} />
        </div>
      ))}
    </Card>;
};

export default ProductFilterCard;
*/