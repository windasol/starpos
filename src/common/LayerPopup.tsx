type Props = {
  title: string;
}

function LayerPopup({title} : Props) {
  return (
    <section className="layerPopupWrap">
      <div className="layerPopup">
        <div className="layerPopupHeader">
          <h1 v-if="title" className="layerPopupTit">
            {title}
          </h1>
          <button
            type="button"
            v-if="!hideBtnClose"
            className="btnClose"
          ></button>
        </div>
        <div className="layerPopupContents">
          <slot></slot>
        </div>
        <div v-if="$slots.btnArea" className="layerPopupBtnArea">
          <slot name="btnArea"></slot>
        </div>
      </div>
    </section>
  );
}

export default LayerPopup;
