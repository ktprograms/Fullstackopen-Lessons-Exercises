import { BlogModel } from '../models/Blog.model';

export const Blog = {
    $: {
        list: document.querySelector('#list'),
        form: document.querySelector('#create'),
    },
    Model: new BlogModel(),

    init() {
        Blog.Model.addEventListener('save', Blog.render);
        Blog.$.form.addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = new FormData(Blog.$.form);
            const title = formData.get('title').trim();
            const author = formData.get('author').trim();
            const url = formData.get('url').trim();
            if (title && author && url) {
                Blog.Model.create({
                    title, author, url,
                    likes: Math.floor(Math.random() * 100),
                });
            }

            Blog.$.form.reset();
        });
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
