import {  Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.model';

@Injectable()
export class ProductsService{
    private products: Product[] = [];

    insertProduct(title: string, desc: string, price: number) {
    const prodId = Math.random().toString();
    const newProduct = new Product(prodId, title, desc, price);
    // tslint:disable-next-line:no-console
    console.debug(newProduct);
    this.products.push(newProduct);
    return prodId;
    }

    getProducts() {
    return [...this.products];
    }
    getById(prodId: string) {
     const product = this.findProduct(prodId)[0];
     return { ...product};
    }
    updateProduct(prodId: string, title: string, desc: string, price: number) {
        const [product, index] = this.findProduct(prodId);
        const updatedProduct = {...product};
        if (title) {
        updatedProduct.title = title;
       }
        if (desc) {
        updatedProduct.description = desc;
       }
        if (price) {
        updatedProduct.price = price;
       }

        this.products[index] = updatedProduct;
    }

    deleteProduct(prodId: string) {
        const  index = this.findProduct(prodId)[1];
        this.products.splice(index, 1);
    }
    private findProduct(id: string): [Product, number] {
        const productIndex = this.products.findIndex((x) => x.id === id);
        const product = this.products[productIndex];
        if (!product) {
        throw new NotFoundException('Product with id: ' + id + ' does not exist');
        }
        return [product, productIndex];
    }
}
