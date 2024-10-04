import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";


export function AllProducts({ Products,deleteById }) {
  

  return (
    <div className="max-w-5xl mx-auto">
      <Table>
        <TableCaption>A list of your Food items.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Products?.map((Product, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{index+1}</TableCell>
              <TableCell>{Product.FoodName}</TableCell>
              <TableCell>{Product.Price}</TableCell>
              <TableCell className="text-right">
                <Button
                  onClick={() => deleteById(Product.FoodItemID)}
                  variant="destructive"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
