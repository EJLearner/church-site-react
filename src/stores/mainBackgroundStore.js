import churchExterior from '../assets/main/images/church-exterior.png';

let currentBackground = churchExterior;

const mainBackgroundStore = {
  getBackground: () => currentBackground
};

export default mainBackgroundStore;
