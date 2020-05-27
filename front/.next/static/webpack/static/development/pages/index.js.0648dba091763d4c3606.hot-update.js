webpackHotUpdate("static\\development\\pages\\index.js",{

/***/ "./components/ImagesZoom.js":
/*!**********************************!*\
  !*** ./components/ImagesZoom.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/slicedToArray */ "./node_modules/@babel/runtime-corejs2/helpers/esm/slicedToArray.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
/* harmony import */ var react_slick__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-slick */ "./node_modules/react-slick/lib/index.js");
/* harmony import */ var react_slick__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_slick__WEBPACK_IMPORTED_MODULE_4__);

var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;





var ImagesZoom = function ImagesZoom(_ref) {
  var images = _ref.images,
      onClose = _ref.onClose;

  var _useStatet = useStatet(0),
      _useStatet2 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_useStatet, 2),
      currentSlide = _useStatet2[0],
      setCurrentSlide = _useStatet2[1];

  return __jsx("div", null, __jsx("div", null, __jsx("h1", null, "\uC0C1\uC138\uC774\uBBF8\uC9C0"), __jsx(antd__WEBPACK_IMPORTED_MODULE_3__["Icon"], {
    type: "close",
    onClick: onClose
  })), __jsx("div", null, __jsx("div", null, __jsx(react_slick__WEBPACK_IMPORTED_MODULE_4___default.a, null, images.map(function (v) {
    return __jsx("div", null, __jsx("img", {
      src: "http://localhost:3065/".concat(v.src)
    }));
  })), __jsx("div", null, __jsx("div", null, currentSlide + 1, " / ", images.length)))));
};

ImagesZoom.propTypes = {
  images: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.shape({
    src: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string
  })).isRequired,
  onClose: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (ImagesZoom);

/***/ })

})
//# sourceMappingURL=index.js.0648dba091763d4c3606.hot-update.js.map