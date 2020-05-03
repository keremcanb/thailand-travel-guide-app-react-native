import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import axios from "axios";
import CategoryGridTile from "../components/CategoryGridTile";
import useResources from "../components/useResources";

const CategoriesScreen = ({ navigation }) => {
  const categories = useResources("categories");
  const locations = navigation.getParam("locationId");
  const displayedCategories = categories.filter(
    (item) => item.location.indexOf(locations) >= 0
  );

  const renderGridItem = (itemData) => {
    return (
      <CategoryGridTile
        image={itemData.item.image}
        title={itemData.item.title}
        onSelect={() => {
          navigation.navigate({
            routeName: "CategoryPlaces",
            params: {
              categoryId: itemData.item.title,
              locationId: locations,
            },
          });
        }}
      />
    );
  };

  return (
    <FlatList
      data={displayedCategories}
      renderItem={renderGridItem}
      numColumns={2}
      keyExtractor={(item, index) => item._id}
    />
  );
};

CategoriesScreen.navigationOptions = (navData) => {
  const locId = navData.navigation.getParam("locationId");

  return {
    headerTitle: locId,
  };
};

export default CategoriesScreen;