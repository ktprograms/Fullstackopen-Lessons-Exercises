import { BlogModel } from '../models/Blog.model';

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
        Blog.addItemEventListeners();
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
            const el = Blog.itemFromEvent(event);
            el.$.comment.textContent = event.detail.comment;
        });
        Blog.Model.addEventListener('like', function (event) {
            const el = Blog.itemFromEvent(event);
            el.$.likes.textContent = event.detail.likes;
        });
        Blog.Model.addEventListener('remove', function (event) {
            const el = Blog.itemFromEvent(event);
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
                Blog.filterHideElement(el, filter);
            });
        });
    },
    addItemEventListeners() {
        function addItemEventListener(event, selector, handler) {
            Blog.$.list.addEventListener(event, function (event) {
                const el = event.target.closest('[data-id]');
                if (event.target.matches(selector)) {
                    return handler(el, event);
                }
            });
        }

        addItemEventListener('click', Blog.$item.details, function (el, event) {
            const details = event.target;

            el.$.detailsDiv.classList.toggle('hidden');
            if (el.$.detailsDiv.classList.contains('hidden')) {
                details.textContent = 'show';
            } else {
                details.textContent = 'hide';
            }
        });
        addItemEventListener('click', Blog.$item.remove, function (el) {
            // TODO: window.confirm
            // (seems like there's going to need to be "caching" of the blogs in frontend)
            // (doesn't make sense to have a GET just to DELETE later)
            // (But is that good in terms of data consistency? - I guess it's the same as it currently is)
            Blog.Model.remove(el.dataset.id);
        });
        addItemEventListener('click', Blog.$item.like, function (el) {
            Blog.Model.like(el.dataset.id);
        });

        addItemEventListener('keypress', Blog.$item.like, function (el, event) {
            const key = event.key;
            if (key === ' ') {
                event.preventDefault();
                Blog.Model.like(el.dataset.id);
                return false;
            }
        });

        addItemEventListener('submit', Blog.$item.form, function (el, event) {
            event.preventDefault();

            const formData = new FormData(event.target);
            const first = formData.get('first').trim();
            const second = formData.get('second').trim();

            if (first || second) {
                const comment = first ? `first: ${first}` : `second: ${second}`;
                Blog.Model.setComment(el.dataset.id, comment);
            }

            event.target.reset();
        });
    },

    filterHideElement(el, filter) {
        const title = el.$.title.textContent;
        if (title.toLowerCase().includes(filter.toLowerCase())) {
            el.classList.remove('hidden');
        } else {
            el.classList.add('hidden');
        }
    },

    $item: {
        title: '[data-component="title"]',
        author: '[data-component="author"]',
        url: '[data-component="url"]',
        likes: '[data-component="likes"]',
        comment: '[data-component="comment"]',

        details: '[data-component="details"]',
        detailsDiv: '[data-component="details-div"]',

        remove: '[data-component="remove"]',
        like: '[data-component="like"]',

        form: 'form',
    },
    asItem(el) {
        el.$ = {
            title: el.querySelector(Blog.$item.title),
            author: el.querySelector(Blog.$item.author),
            url: el.querySelector(Blog.$item.url),
            likes: el.querySelector(Blog.$item.likes),
            comment: el.querySelector(Blog.$item.comment),

            detailsDiv: el.querySelector(Blog.$item.detailsDiv),
        };
        return el;
    },
    itemFromEvent(event) {
        return Blog.asItem(Blog.$.list.querySelector(`[data-id="${event.detail.id}"]`));
    },

    createItem(blog) {
        const el = Blog.asItem(document.querySelector('#blog').content.cloneNode(true).firstElementChild);
        el.dataset.id = blog.id;
        el.$.title.textContent = blog.title;
        el.$.author.textContent = blog.author;
        el.$.url.textContent = blog.url;
        el.$.likes.textContent = blog.likes;

        Blog.filterHideElement(el, Blog.$.filter.value);

        return el;
    },
    render(blogs) {
        Blog.$.list.replaceChildren(
            ...(
                blogs.map(Blog.createItem)
            )
        );
    },
};
