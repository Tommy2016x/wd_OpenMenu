import React, { Component } from "react";
import RecipeV from "./RecipeV";
import RecipeA from "./../../store/actions/RecipeA";
import { connect } from "react-redux";

// const recipeID = "1539371834732MushroomSausageRaguuser1";

class RecipeC extends Component {
  state = {
    openEditDialog: false,
    itemName: ""
  };

  handleEditClickOpen = () => {
    this.setState({
      openEditDialog: true
    });
  };

  handleClose = () => {
    this.setState({
      openEditDialog: false
    });
  };

  handleAddItem = () => {
    let newItem = {
      itemId: this.state.currentIngredient,
      amount: this.state.currentIngredientAmount
    };
    this.setState({
      ingredients: this.state.ingredients.concat(newItem)
    });
    console.log(this.state.ingredients);
    // clear the current value
    this.setState({ currentIngredient: "", currentIngredientAmount: "" });
  };

  editItemDetails = e => {
    let field = e.target.name;
    let value = e.target.value;

    switch (field) {
      case "name":
        this.setState({
          newName: value
        });
        break;

      default:
        break;
    }
    console.log(this.state.newName);
  };

  // addNewItem = () => {
  //   const user = localStorage.getRecipe("user");
  //   const name = this.state.newName;

  //   // uid is comming from tommy's pull request
  //   let itemInfo = {
  //     name: name,
  //     user: user,
  //     image: this.state.newImageURL,
  //     description: this.state.newDescription,
  //     size: this.state.newSize,
  //     price: this.state.newPrice,
  //     tags: this.state.newTags,
  //     uid: this.generateId(name, user)
  //   };
  //   this.props.recipeFn.createRecipes(itemInfo);
  // };

  generateId = (name, user) => {
    let newName = name.replace(/\W/g, "");
    let newUser = user.replace(/\W/g, "");

    let date = Date.now();

    let id = date + newName + newUser;

    return id;
  };

  render() {
    return (
      <div>
        {this.props.userRecipes
          .filter(recipe => {
            return recipe.uid === this.props.match.params.id;
          })
          .map(returnRecipe => {
            return (
              <RecipeV
                recipe={returnRecipe}
                userItems={this.props.userItems}
                openEditDialog={this.state.openEditDialog}
                handleEditClickOpen={this.handleEditClickOpen}
                handleCloseDialog={this.handleClose}
              />
            );
          })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userRecipes: state.RecipeR.userRecipes,
    userItems: state.ItemR.userItems
  };
};

const mapDispatchToProps = dispatch => {
  return {
    recipeFn: RecipeA(dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeC);
