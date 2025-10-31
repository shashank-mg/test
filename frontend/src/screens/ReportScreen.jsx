import {useState} from "react";
import { Form, Row, Col, Card, Image, Button, ListGroup } from "react-bootstrap";
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useGetDetailsQuery } from "../slices/detailsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { addToCart } from "../slices/cartSlice";

const ReportScreen = () => { 
    const dispatch = useDispatch();
    const navigate = useNavigate();    
    const [qty, setQty] = useState(1);
    const { id: productId } = useParams();
    const { data: product, isLoading, error } = useGetDetailsQuery(productId);
    const addToCartHandler = () => {
        dispatch(addToCart({
            ...product,
            qty
        }));
        navigate('/cart');
    }
    return (
    <>
    {
    isLoading ? ( <Loader /> ) 
    : error ? ( <Message variant="danger">{error?.data?.message || error.error}</Message>) : 
    (
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
                    <ListGroup>{product.countInStock > 0 ? (
                        <ListGroup.Item>
                            <Row>
                                <Col>Qty:</Col>
                                <Col>
                                    <Form.Control
                                        as='select' 
                                        value={qty}
                                        onChange={(e) => setQty(Number(e.target.value))}
                                    >
                                        {[...Array(product.countInStock).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Col>
                            </Row>
                        </ListGroup.Item>):''}
                        </ListGroup>
                    <ListGroup.Item>
                        <Button className='btn-block' type='button' disabled={product.countInStock === 0} onClick={addToCartHandler}>Add to Cart</Button>
                    </ListGroup.Item> 
                </ListGroup>
            </Card>        
        </Col>
    </Row>   
    </>
          ) }
    
    </>
    )
}

export default ReportScreen