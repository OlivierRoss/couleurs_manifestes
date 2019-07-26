var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Oeuvre = function (_React$Component) {
  _inherits(Oeuvre, _React$Component);

  function Oeuvre(props) {
    _classCallCheck(this, Oeuvre);

    var _this = _possibleConstructorReturn(this, (Oeuvre.__proto__ || Object.getPrototypeOf(Oeuvre)).call(this, props));

    _this.state = {
      value: null
    };
    return _this;
  }

  _createClass(Oeuvre, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "article",
        { className: "oeuvre" },
        React.createElement(
          "header",
          null,
          React.createElement(
            "div",
            { className: "dimension-precedente" },
            "Politique"
          ),
          React.createElement(
            "div",
            { className: "nom-oeuvre" },
            this.props.nom
          ),
          React.createElement(
            "div",
            { className: "dimension-suivante" },
            "Biographie"
          )
        ),
        React.createElement(
          "div",
          { className: "contenu-dimension" },
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris metus eros, consectetur ac rhoncus id, condimentum vel lectus. In nec erat metus. Suspendisse vehicula, enim in faucibus auctor, ante lorem aliquam lacus, sit amet aliquam orci massa quis dui. Etiam lacinia quam pharetra nunc dictum, vel interdum nisi cursus. Aenean porttitor massa sit amet ex pharetra, et finibus lacus laoreet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus vestibulum metus ac aliquet interdum. Ut venenatis massa mauris, ut maximus est hendrerit non. Duis elit leo, faucibus quis rhoncus efficitur, efficitur finibus purus. Sed gravida, mi at interdum consectetur, nulla sapien pharetra justo, at scelerisque libero risus fringilla lorem. Nunc venenatis vitae libero at consectetur. Duis venenatis euismod arcu vitae posuere. Etiam efficitur ligula nec odio iaculis, sed finibus sapien suscipit. Quisque pulvinar quam vel euismod pharetra. Phasellus vel urna cursus, feugiat mi vitae, pellentesque est. Donec lobortis mauris sit amet velit bibendum, nec venenatis diam lacinia. Suspendisse felis ligula, mollis id sapien eget, aliquam laoreet velit. Suspendisse potenti. Maecenas finibus faucibus interdum. Nunc egestas, nulla ac aliquam dictum, justo felis porttitor orci, a malesuada magna odio sed ipsum. Curabitur at tortor vulputate, blandit magna non, aliquet ex. Nulla maximus faucibus sapien, ut pretium dui interdum quis. Cras viverra, augue vel laoreet varius, erat augue pellentesque turpis, ac mollis arcu metus vitae nibh. Sed dignissim posuere rutrum. Donec maximus metus et turpis lacinia, eget pretium justo pulvinar. Aliquam erat volutpat. Maecenas faucibus eu elit sit amet interdum. Cras non feugiat mauris. Suspendisse potenti. Proin laoreet aliquet maximus. Vestibulum enim ex, dignissim sit amet nisi in, mattis blandit est. Praesent sit amet est dignissim, imperdiet orci nec, finibus augue. Phasellus sed ligula nec risus congue pharetra sit amet vitae justo. Sed dignissim lorem orci, a auctor tortor ullamcorper non. Suspendisse auctor efficitur quam id dapibus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur tincidunt purus ac dolor mattis, sit amet mattis lacus sagittis. Cras sodales vehicula arcu, ut molestie lacus fringilla pulvinar."
        )
      );
    }
  }]);

  return Oeuvre;
}(React.Component);