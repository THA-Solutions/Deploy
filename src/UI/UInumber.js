const formatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const UInumber = ({ children, classNameProp }) => {
  return <span className={classNameProp}>{formatter.format(children)}</span>;
};

export default UInumber;
