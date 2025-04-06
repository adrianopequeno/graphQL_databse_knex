import { ValidationError } from "apollo-server";
import { SQLDataSource } from "../../datasources/sql/sql-datasource.js";

export class CommentSQLDataSource extends SQLDataSource {
  async getById(id) {
    // return this.db("comments").where({ id }).first();
    return this.db("comments").where("id", "=", id);
  }

  async create({ userId, postId, comment }) {
    const partialComment = {
      user_id: userId,
      post_id: postId,
      comment,
    };

    // const exists = await this.db('comments').where(partialComment).first();
    const exists = await this.db("comments").where(partialComment);
    if (exists.length > 0) {
      throw new ValidationError("Comment already exists");
    }

    const create = await this.db("comments")
      .insert(partialComment)
      .returning("id");

    // console.log(create[0].id);
    return {
      id: create[0].id,
      createdAt: new Date().toISOString(),
      ...partialComment,
    };
  }
}
