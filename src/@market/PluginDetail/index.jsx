import { useEffect } from "react";
import AppCard from "@crema/components/AppCard";
import AppInfoView from "@crema/components/AppInfoView";
import AppAnimate from "@crema/components/AppAnimate";
import AppRowContainer from "@crema/components/AppRowContainer";
import { Col } from "antd";
import AppPageMeta from "@crema/components/AppPageMeta";
import { useParams } from "react-router-dom";
import { StyledPluginDetails } from "./index.styled";
import { useGetDataApi } from "@crema/hooks/APIHooks";
import Header from "./Header";
import PluginView from "./PluginView";
import SimilarPlugin from "./SimilarPlugins";
import PluginImageSlide from "./PluginImageSlide";

const PluginDetail = () => {
  const { id } = useParams();
  const [{ apiData: currentPlugin }, { setQueryParams }] =
    useGetDataApi("/api/ecommerce/get");

  useEffect(() => {
    setQueryParams({ id: id });
  }, [id]);

  return (
    <StyledPluginDetails>
      <AppPageMeta title="Plugin Details" />
      {currentPlugin ? (
        <AppAnimate animation="transition.slideUpIn" delay={200}>
          <AppCard key="product_detail">
            <Header product={currentPlugin} />
            <AppRowContainer>
              <Col sm={24} lg={8}>
                <PluginImageSlide product={currentPlugin} />
              </Col>
              <Col sm={24} lg={16}>
                <PluginView product={currentPlugin} />
              </Col>
            </AppRowContainer>
            <SimilarPlugin />
          </AppCard>
        </AppAnimate>
      ) : null}
      <AppInfoView />
    </StyledPluginDetails>
  );
};

export default PluginDetail;
