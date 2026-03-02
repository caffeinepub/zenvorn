import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";



actor {
  type Article = {
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

  let articles = Map.empty<Nat, Article>();

  public query ({ caller }) func getArticles() : async [Article] {
    articles.values().toArray();
  };

  public query ({ caller }) func getArticleById(id : Nat) : async Article {
    switch (articles.get(id)) {
      case (?article) { article };
      case (null) { Runtime.trap("Article with id " # id.toText() # " does not exist") };
    };
  };

  public query ({ caller }) func getArticlesByCategory(category : Text) : async [Article] {
    articles.values().filter(
      func(article) { Text.equal(article.category, category) }
    ).toArray();
  };

  public query ({ caller }) func getFeaturedArticles() : async [Article] {
    articles.values().filter(
      func(article) { article.isFeatured }
    ).toArray();
  };

  public query ({ caller }) func getBreakingArticles() : async [Article] {
    articles.values().filter(
      func(article) { article.isBreaking }
    ).toArray();
  };

  public query ({ caller }) func searchArticles(searchTerm : Text) : async [Article] {
    let lowerQuery = searchTerm.toLower();
    articles.values().filter(
      func(article) {
        article.title.toLower().contains(#text lowerQuery) or
        article.excerpt.toLower().contains(#text lowerQuery)
      }
    ).toArray();
  };
};
