import React, { useRef, useEffect, useState } from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import axios from "axios";
import { BASE_URL } from "../utils/config";

const OfferScreen = () => {
  //this comment is for making animation of automatic movving the offer screen
  const flatListRef = useRef(null);
  const [offers, setOffers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios
      .get(`${BASE_URL}offer`)
      .then((response) => {
        setOffers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching offers:", error);
      });
  }, []);
  // this below code is for automatic scroling the add
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const nextIndex = (currentIndex + 1) % offers.length;
  //     setCurrentIndex(nextIndex);
  //     flatListRef.current.scrollToIndex({ animated: true, index: nextIndex });
  //   }, 2500);

  //   return () => clearInterval(interval);
  // }, [currentIndex, offers]);

  const renderItem = ({ item }) => (
    <View style={styles.offerItem}>
      <Image source={{ uri: item.imageUrl }} style={styles.offerImage} />
      <View style={styles.textContainer}>
        <Text style={styles.offerTitle}>{item.title}</Text>
        <Text style={styles.offerDescription}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={offers}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={350}
        decelerationRate={0.8}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        onScroll={(event) => {
          const offsetX = event.nativeEvent.contentOffset.x;
          const index = Math.floor(offsetX / 330);
          setCurrentIndex(index);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 130,
    width: 400,
  },
  offerItem: {
    width: 380,
    height: 140,
    borderRadius: 25,
    marginRight: 15,
    overflow: "visible",
    padding: 8,
    // shadowColor: "blue",
    // shadowRadius: 1,
    // shadowOpacity: 1,
  },
  offerImage: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
  textContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 30,
    backgroundColor: "rgba(193, 193, 193, 0.6)",
    padding: 10,
    margin: 15,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  offerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  offerDescription: {
    fontSize: 12,
    color: "black",
  },
});

export default OfferScreen;
