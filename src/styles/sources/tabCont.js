export default function (styles, mod) {

  return {
    mixins: ['panel'],

    borderTopLeftRadius: 0,
    flex: 1,
    overflow: 'auto',

    stretchLabels: {
      borderTopRightRadius: 0,
    }
  };
}
