export const View = {
    list: document.querySelector('#list'),
    filter: document.querySelector('#filter'),
    form: document.querySelector('#create'),
    // displayNotification(message, isSuccess) {
    //     const notification = document.querySelector('.notification');
    //     notification.textContent = message;

    //     if (isSuccess) {
    //         notification.classList.remove('notification--error');
    //         notification.classList.add('notification--success');
    //     } else {
    //         notification.classList.remove('notification--success');
    //         notification.classList.add('notification--error');
    //     }

    //     notification.classList.remove('hidden');
    //     setTimeout(function () {
    //         notification.classList.add('hidden');
    //     }, 5000);
    // },

    $blog: {
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

    createBlogEl(blog) {
        const el = document.querySelector('#blog').content.cloneNode(true).firstElementChild;
        el.dataset.id = blog.id;
        el.querySelector(View.$blog.title).textContent = blog.title;
        el.querySelector(View.$blog.author).textContent = blog.author;
        el.querySelector(View.$blog.url).textContent = blog.url;
        el.querySelector(View.$blog.likes).textContent = blog.likes;

        // Blog.filterHideElement(el, Blog.$.filter.value);

        return el;
    },

    ////

    init() {
        View.bindToggleBlogDetails();
    },

    ////

    addBlog(blog) {
        View.list.appendChild(View.createBlogEl(blog));
    },

    addBlogs(blogs) {
        View.list.replaceChildren(
            ...(
                blogs.map(View.createBlogEl)
            )
        );
    },

    ////

    bindAddBlog(handler) {
        View.form.addEventListener('submit', function (event) {
            event.preventDefault();

            const formData = new FormData(event.target);
            const title = formData.get('title').trim();
            const author = formData.get('author').trim();
            const url = formData.get('url').trim();

            handler(title, author, url);

            event.target.reset();
        });
    },

    ////

    bindToggleBlogDetails() {
        View.list.addEventListener('click', function (event) {
            const el = event.target.closest('[data-id]');
            if (event.target.matches(View.$blog.details)) {
                const details = event.target;
                const detailsDiv = el.querySelector(View.$blog.detailsDiv);

                detailsDiv.classList.toggle('hidden');
                if (detailsDiv.classList.contains('hidden')) {
                    details.textContent = 'show';
                } else {
                    details.textContent = 'hide';
                }
            }
        });
    },
};
