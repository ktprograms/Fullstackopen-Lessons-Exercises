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

            const formData = new FormData(event.target);
            const title = formData.get('title').trim();
            const author = formData.get('author').trim();
            const url = formData.get('url').trim();
            if (title && author && url) {
                Blog.Model.create({
                    title, author, url,
                    likes: Math.floor(Math.random() * 100),
                });
            }

            event.target.reset();
        });
        Blog.bindItemEvents();
        Blog.render();
    },

    bindItemEvents() {
        Blog.$.list.addEventListener('click', function(event) {
            if (event.target.matches('[data-component="details"]')) {
                const el = event.target.closest('[data-id]');
                Blog.Model.toggleDetails(el.dataset.id);
            }
        });
    },

    createItem(blog) {
        const el = document.querySelector('#blog').content.cloneNode(true);
        el.querySelector('.blog').dataset.id = blog.id;

        el.querySelector('[data-component="title"]').textContent = blog.title;
        el.querySelector('[data-component="author"]').textContent = blog.author;

        if (blog.detailsShown) {
            el.querySelector('[data-component="details"]').textContent = 'hide';
            el.querySelector('[data-component="details-div"]').classList.remove('hidden');
        } else {
            el.querySelector('[data-component="details"]').textContent = 'show';
            el.querySelector('[data-component="details-div"]').classList.add('hidden');
        }

        el.querySelector('[data-component="url"]').textContent = blog.url;
        el.querySelector('[data-component="likes"]').textContent = blog.likes;

        return el;
    },
    render() {
        Blog.$.list.replaceChildren(
            ...(
                Blog.Model
                    .all()
                    .map(Blog.createItem)
            )
        );
    },
};
