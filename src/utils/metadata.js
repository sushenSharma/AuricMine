let metadata;

const getMetaLabels = (metadata) => {
  return metadata.filter(({ type }) => type === "LABEL");
};

const getMetaStyles = (metadata) => {
  return metadata.filter(({ type }) => type === "STYLE");
};

export const setMetadata = (_metadata) => {
  metadata = {};
  const label = getMetaLabels(_metadata);
  const style = getMetaStyles(_metadata);

  metadata = {
    ...(label.length && { label }),
    ...(style.length && { style }),
  };

  localStorage.setItem("metadata", JSON.stringify(metadata));
};

const getMetadata = () => {
  if (!metadata) {
    metadata = JSON.parse(localStorage.getItem("metadata") || "{}");
  }
  return metadata;
};

export const styles = () => {
  return getMetadata()?.style || [];
};

export const labels = () => {
  return getMetadata()?.label || [];
};
