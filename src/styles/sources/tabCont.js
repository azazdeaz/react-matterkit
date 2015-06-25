export default function (theme, mod) {

  return {
    mixins: ['panel'],

    borderTopLeftRadius: 0,
    flex: 1,
    overflow: 'auto',

    stretchLabels: {
      borderTopRightRadius: 0,
    }
  }
}
