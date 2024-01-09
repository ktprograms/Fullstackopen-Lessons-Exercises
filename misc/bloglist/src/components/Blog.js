import { BlogModel } from '../models/Blog.model';

export const Blog = {
    $: {
        list: document.querySelector('#list'),
    },
    Model: new BlogModel(),
    init() {
        Blog.render();
    },
    createItem(blog) {
        const el = document.querySelector('#blog').content.cloneNode(true);
        el.querySelector('[data-component="title"]').textContent = blog.title;
        el.querySelector('[data-component="author"]').textContent = blog.author;
        return el;
    },
    render() {
        Blog.$.list.replaceChildren(
            ...Blog.Model
                .all()
                .map(Blog.createItem)
        );
    },
};
