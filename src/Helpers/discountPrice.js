export const discountPrice =(product)=>{
    const newPrice = parseInt(product.price) * ((100 - product.discount) / 100);
    return newPrice;
}