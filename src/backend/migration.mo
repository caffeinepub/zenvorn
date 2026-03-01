import Map "mo:core/Map";
import Nat "mo:core/Nat";
import List "mo:core/List";

module {
  type Category = {
    #World;
    #MiddleEast;
    #Politics;
    #Analysis;
  };

  type OldArticle = {
    id : Nat;
    title : Text;
    excerpt : Text;
    content : Text;
    category : Category;
    author : Text;
    publishDate : Text;
    readTime : Nat;
    imageUrl : Text;
    featured : Bool;
    slug : Text;
  };

  type OldActor = {
    articles : Map.Map<Nat, OldArticle>;
    breakingNews : List.List<Text>;
    currentId : Nat;
  };

  type NewArticle = {
    id : Nat;
    title : Text;
    excerpt : Text;
    content : Text;
    category : Text;
    author : Text;
    date : Text;
    imageUrl : Text;
    readingTime : Text;
    isFeatured : Bool;
    isBreaking : Bool;
    slug : Text;
  };

  type NewActor = {
    articles : Map.Map<Nat, NewArticle>;
  };

  func convertOldCategoryToText(category : Category) : Text {
    switch (category) {
      case (#World) { "World" };
      case (#MiddleEast) { "Middle East" };
      case (#Politics) { "Politics" };
      case (#Analysis) { "Analysis" };
    };
  };

  public func run(old : OldActor) : NewActor {
    let newArticles = old.articles.map<Nat, OldArticle, NewArticle>(
      func(_id, oldArticle) {
        {
          id = oldArticle.id;
          title = oldArticle.title;
          excerpt = oldArticle.excerpt;
          content = oldArticle.content;
          category = convertOldCategoryToText(oldArticle.category);
          author = oldArticle.author;
          date = oldArticle.publishDate;
          imageUrl = oldArticle.imageUrl;
          readingTime = oldArticle.readTime.toText() # " min";
          isFeatured = oldArticle.featured;
          isBreaking = false;
          slug = oldArticle.slug;
        };
      }
    );
    { articles = newArticles };
  };
};
