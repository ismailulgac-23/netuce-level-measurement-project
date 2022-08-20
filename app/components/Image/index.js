import React from "react";
import { StyleSheet, Image } from "react-native";
import PropTypes from "prop-types";

export default function Index(props) {
  const { style, resizeMode, ...rest } = props;
  return (
    <Image
      style={StyleSheet.flatten([style && style])}
      {...rest}
      resizeMode={resizeMode}
    />
  );
}

Index.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  resizeMode: PropTypes.string,
};

Index.defaultProps = {
  style: {},
  resizeMode: "cover",
};
