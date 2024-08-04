
import React from "react";
const LinearCategories = (categories, options = []) => {
    if (!Array.isArray(categories)) return options;

    for (let category of categories) {
      if (category && category._id && category.name) {
        options.push({ value: category._id, name: category.name, parentId: category.parentId , type:category.type});

        if (Array.isArray(category.children) && category.children.length > 0) {
            LinearCategories(category.children, options);
        }
      }
    }
    return options;
  };
  export default LinearCategories