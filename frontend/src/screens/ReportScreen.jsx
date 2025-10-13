import { useState, useEffect } from "react";
import { Row, Col, Card, Image, Button, ListGroup } from "react-bootstrap";
import { Link, useParams } from 'react-router-dom';
import axios from "axios";

const ReportScreen = () => {    
    const [product, setProduct] = useState({});   
    
    const { id: productId } = useParams();
    
    useEffect(() => {
      const fetchProduct = async () => {
        const { data } = await axios.get(`/api/products/${productId}`);
        setProduct(data);
      }
        fetchProduct();
    }, [productId]);


    return (
    <>
    <Link className='btn btn-light my-3' to='/'>Go Back</Link> 
    <Row>
        <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />  
        </Col>
        <Col md={3}>
            <ListGroup variant='flush'>     
                <ListGroup.Item>                 
                    <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                    Price: ${product.price}
                </ListGroup.Item>
                <ListGroup.Item>
                    Description: {product.description}      
                </ListGroup.Item>   
            </ListGroup>
        </Col>
        <Col md={3}>    
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <Row>
                            <Col>Price:</Col>
                            <Col><strong>${product.price}</strong></Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Status:</Col>
                            <Col>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button className='btn-block' type='button' disabled={product.countInStock === 0}>Add to Cart</Button>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Report Issue:</Col>
                            <Col><Button className='btn-block' type='button'>Report</Button></Col>
                        </Row>
                    </ListGroup.Item>   
                </ListGroup>
            </Card>        
        </Col>
    </Row>   
    </>
  )
}

export default ReportScreen