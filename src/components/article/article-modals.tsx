import React, { useState, useEffect } from "react";
import { Modal, View } from "react-native";
import { FilterList, FAB, Button } from "../ui/form";
import { FabBottomRight, Text, BaseWrapper } from "../ui/base";
import { store } from "../../store";
import {
  Article,
  startLoadingArticles,
  startCreatingTransaction
} from "../../store/reducers";
import { Currency } from "../ui/text";

export const BuyArticleModal: React.FC<{ userId: string }> = props => {
  const [isVisible, setIsVisible] = useState(false);
  const articles: Article[] = Object.values(store.getState().article);

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
        <BaseWrapper style={{ marginTop: 32 }}>
          <FilterList
            renderItem={article => (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text>{article.name}</Text>
                <Currency value={article.amount} />
              </View>
            )}
            items={articles}
            onSelect={onSelect}
          />
        </BaseWrapper>
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
