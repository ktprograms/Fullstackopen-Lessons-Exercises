import { Model } from '../models/BL.model';
import { View } from '../views/BlogList.view';

export const Controller = {
    init() {
        View.init();

        View.bindAddBlog(Controller.addBlog);

        Model.getAll(View.addBlogs);
    },

    addBlog(title, author, url) {
        if (title && author && url) {
            Model.create({
                title, author, url,
                likes: Math.floor(Math.random() * 100),
            }, View.addBlog);
        }
    },
};
