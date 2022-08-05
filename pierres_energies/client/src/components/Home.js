import { Component } from 'react';
import AppNavBar from './AddNavbar';
import { Card, CardText, CardBody, CardTitle, Cardsubtitle, Button, Container, Alert } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getItems } from '../actions/itemActions';
import { addToCart } from '../actions/cartActions';

class Home extends Component {

  componentDidMount() {
    this.props.getItems();
  }

  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
    addToCart: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
  }

  onAddToCart = async (id, productId) => {
    await this.props.addToCart(id, productId, 1);
    alert ('Item added to card');
  }

  render() {
    const { items } = this.props.item;
    const user = this.props.user;

    return (
      <div>
        <AppNavBar />
        <Container>
          <div className="row">
            {items.lenght ? items.map((item) => (
              <div className="col-md-4">
                <Card className='mb-4'>
                  <CardBody>
                    <CardTitle tag='h5'>{item.title}</CardTitle>
                    <CardSubtitle tag='h6'>Rs. {item.price}</CardSubtitle>
                    <Cardtext>{item.category}</Cardtext>
                    {this.props.isAuthenticated ?
                      <Button color="success" size="sm" onClick={this.onAddToCart.bind(this, user._id, item._id)}>
                        Add To Card
                      </Button> : null
                    }
                  </CardBody>
                </Card>  
              </div>
              )): <div style={{width: '100%'}}><Alert className="text-center">No products found.</Alert></div>
            }
          </div>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
})

export default connect(mapStateToProps, {getItems, addToCart})(Home);