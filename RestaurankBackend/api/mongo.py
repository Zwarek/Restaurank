from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")

db = client["RestaurankDB"]

restaurants_collection = db["restaurants"]
restaurantTypes_collection = db["restaurantTypes"]
users_collection = db["users"]
comments_collection = db["comments"]
ratings_collection = db["ratings"]
