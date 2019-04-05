import React, { useState, useEffect } from "react";
import { Modal, View } from "react-native";
import { FilterList, FAB, Button } from "../ui/form";
import { FabBottomRight } from "../ui/base";
import { store } from "../../store";
import {
  Article,
  startLoadingArticles,
  startCreatingTransaction
} from "../../store/reducers";

export const BuyArticleModal: React.FC<{ userId: string }> = props => {
  const [isVisible, setIsVisible] = useState(false);
  const articles = Object.values(store.getState().article);

  useEffect(() => {
    startLoadingArticles(store.dispatch);
  }, []);

  const onSelect = async (item: Article) => {
    startCreatingTransaction(store.dispatch, props.userId, {
      articleId: item.id
    });
    setIsVisible(false);
  };

  return (
    <>
      <Button
        isPrimary
        title="BUY ARTICLE"
        onPress={() => setIsVisible(true)}
      />
      <Modal
        animationType="slide"
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}
      >
        <View style={{ marginTop: 32 }}>
          <FilterList items={articles} onSelect={onSelect} />
        </View>
        <FabBottomRight>
          <FAB
            elevation={2}
            icon="times"
            isRed
            onPress={() => setIsVisible(false)}
          />
        </FabBottomRight>
      </Modal>
    </>
  );
};
