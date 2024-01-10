import { BlogModel } from '../models/Blog.model';

class Item {
    static $ = {
        title: '[data-component="title"]',
        author: '[data-component="author"]',
        url: '[data-component="url"]',
        likes: '[data-component="likes"]',
        comment: '[data-component="comment"]',
    };

    constructor(el) {
        this.el = el; // TODO: Prevent direct modification of el - Or not?
    }

    set visible(visible) {
        if (visible) {
            this.el.classList.remove('hidden');
        } else {
            this.el.classList.add('hidden');
        }
    }

    set id(id) {
        this.el.dataset.id = id;
    }

    get title() {
        return this.el.querySelector(Item.$.title).textContent;
    }

    set title(title) {
        this.el.querySelector(Item.$.title).textContent = title;
    }
    set author(author) {
        this.el.querySelector(Item.$.author).textContent = author;
    }
    set url(url) {
        this.el.querySelector(Item.$.url).textContent = url;
    }
    set likes(likes) {
        this.el.querySelector(Item.$.likes).textContent = likes;
    }
}

export const Blog = {
    $: {
        list: document.querySelector('#list'),
        filter: document.querySelector('#filter'),
        form: document.querySelector('#create'),
        displayNotification(message, isSuccess) {
            const notification = document.querySelector('.notification');
            notification.textContent = message;

            if (isSuccess) {
                notification.classList.remove('notification--error');
                notification.classList.add('notification--success');
            } else {
                notification.classList.remove('notification--success');
                notification.classList.add('notification--error');
            }

            notification.classList.remove('hidden');
            setTimeout(function () {
                notification.classList.add('hidden');
            }, 5000);
        },
    },
    Model: new BlogModel(),

    init() {
        Blog.addModelEventListeners();
        Blog.addElementEventListeners();
        Blog.addListItemEventListeners();
        Blog.Model.all();
    },

    addModelEventListeners() {
        Blog.Model.addEventListener('create', function (event) {
            const blog = event.detail;
            Blog.$.list.appendChild(Blog.createItem(blog));
            Blog.$.displayNotification(`A new blog ${blog.title} by ${blog.author} added`, true);
        });
        Blog.Model.addEventListener('all', function (event) {
            Blog.render(event.detail);
        });
        Blog.Model.addEventListener('setComment', function (event) {
            const el = Blog.$.list.querySelector(`[data-id="${event.detail.id}"]`);
            el.querySelector('[data-component="comment"]').textContent = event.detail.comment;
        });
        Blog.Model.addEventListener('like', function (event) {
            const el = Blog.$.list.querySelector(`[data-id="${event.detail.id}"]`);
            el.querySelector('[data-component="likes"]').textContent = event.detail.likes;
        });
        Blog.Model.addEventListener('remove', function (event) {
            const el = Blog.$.list.querySelector(`[data-id="${event.detail.id}"]`);
            Blog.$.list.removeChild(el);
        });
    },
    addElementEventListeners() {
        Blog.$.form.addEventListener('submit', function (event) {
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
            } else {
                Blog.$.displayNotification('Title, Author or URL missing', false);
            }

            event.target.reset();
        });
        Blog.$.filter.addEventListener('input', function (event) {
            // Client-side filtering (using DOM values, not directly from model)
            const filter = event.target.value;

            const els = document.querySelectorAll('.blog');
            els.forEach(function (el) {
                Blog.filterHideItem(new Item(el), filter);
            });
        });
    },
    addListItemEventListeners() {
        Blog.$.list.addEventListener('click', function (event) {
            const el = event.target.closest('[data-id]');
            if (event.target.matches('[data-component="details"]')) {
                const details = event.target;
                const detailsDiv = el.querySelector('[data-component="details-div"]');

                detailsDiv.classList.toggle('hidden');
                if (detailsDiv.classList.contains('hidden')) {
                    details.textContent = 'show';
                } else {
                    details.textContent = 'hide';
                }
            } else if (event.target.matches('[data-component="remove"]')) {
                // TODO: window.confirm
                // (seems like there's going to need to be "caching" of the blogs in frontend)
                // (doesn't make sense to have a GET just to DELETE later)
                // (But is that good in terms of data consistency? - I guess it's the same as it currently is)
                Blog.Model.remove(el.dataset.id);
            } else if (event.target.matches('[data-component="like"]')) {
                Blog.Model.like(el.dataset.id);
            }
        });
        Blog.$.list.addEventListener('keypress', function (event) {
            const el = event.target.closest('[data-id]');
            const key = event.key;
            if (event.target.matches('[data-component="like"]') && key === ' ') {
                event.preventDefault();
                Blog.Model.like(el.dataset.id);
                return false;
            }
        });
        Blog.$.list.addEventListener('submit', function (event) {
            if (event.target.matches('form')) {
                const el = event.target.closest('[data-id]');
                event.preventDefault();

                const formData = new FormData(event.target);
                const first = formData.get('first').trim();
                const second = formData.get('second').trim();

                if (first || second) {
                    const comment = first ? `first: ${first}` : `second: ${second}`;
                    Blog.Model.setComment(el.dataset.id, comment);
                }

                event.target.reset();
            }
        });
    },

    filterHideItem(item, filter) {
        item.visible = item.title.toLowerCase().includes(filter.toLowerCase());
    },

    createItem(blog) {
        const el = document.querySelector('#blog').content.cloneNode(true).firstElementChild;
        const item = new Item(el);
        item.id = blog.id;
        item.title = blog.title;
        item.author = blog.author;
        item.url = blog.url;
        item.likes = blog.likes;

        Blog.filterHideItem(item, Blog.$.filter.value);

        return item.el;
    },
    render(blogs) {
        Blog.$.list.replaceChildren(
            ...(
                blogs.map(Blog.createItem)
            )
        );
    },
};
