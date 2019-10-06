import { Controller, Post , Body, Get, Param, Patch, Delete} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController{

    /**
     *
     */
    constructor(private productsService: ProductsService) {
            }
    @Post()
    addProduct(
        @Body('title') title: string ,
        @Body('description') desc: string ,
        @Body('price') price: number): any {
        const generatedId = this.productsService.insertProduct(title, desc, price);
        return {id: generatedId};
 }
    @Get()
    getAllProducts() {
        return this.productsService.getProducts();
    }

    @Get(':id')
    getProduct(@Param('id') prodId: string) {
        return this.productsService.getById(prodId);
    }

    @Patch(':id')
    updateProduct(
        @Param('id') prodId: string,
        @Body('title') title: string,
        @Body('desc') description: string,
        // tslint:disable-next-line:no-empty
        @Body('price') price: number) {
            this.productsService.updateProduct(prodId, title, description, price);
    }

    @Delete(':id')
    deleteProduct(@Param('id') id: string) {
        this.productsService.deleteProduct(id);
    }
}
