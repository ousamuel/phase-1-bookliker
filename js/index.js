document.addEventListener("DOMContentLoaded", function () {
  let currentBook;
  let userData;
  fetch(`http://localhost:3000/users`)
    .then((res) => res.json())
    .then((data) => (userData = data));
  fetch(`http://localhost:3000/books`)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((book) => loadBooks(book));
    });

  const ul = document.getElementById("list");
  const showPanel = document.getElementById("show-panel");
  function loadBooks(book) {
    const li = document.createElement("li");
    li.textContent = book.title;
    ul.append(li);

    li.addEventListener("click", () => {
      currentBook = book;
      showPanel.innerHTML = "";
      const img = document.createElement("img");
      const title = document.createElement("h2");
      const subtitle = document.createElement("h3");
      const author = document.createElement("h4");
      const description = document.createElement("p");
      const usersList = document.createElement("ul");
      const likeBtn = document.createElement("button");

      let idx = Math.floor(Math.random() * userData.length);
      const id = userData[idx].id;
      const username = userData[idx].username;
      console.log(`Current user is: ${username}`);

      function likedButton() {
        likeBtn.addEventListener("click", (e) => {
          e.preventDefault();
          function patch() {
            const newUser = {
              id: id,
              username: username,
            };
            const users = {
              users: [...currentBook.users, newUser],
            };
            const configObject = {
              method: "PATCH",
              headers: {
                "Content-type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify(users),
            };
            fetch(
              `http://localhost:3000/books/${currentBook.id}`,
              configObject
            );
          }

          const newGuy = document.createElement("li");
          newGuy.textContent = username;
          if (likeBtn.textContent == "Like 👍") {
            usersList.append(newGuy);
            patch();
          } else {
            const cut = currentBook.users.length;
            usersList.removeChild(usersList.lastElementChild)
            const users = {
              users: [...currentBook.users.slice(0, cut)],
            };
            const configObject = {
              method: "PATCH",
              headers: {
                "Content-type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify(users),
            };
            fetch(
              `http://localhost:3000/books/${currentBook.id}`,
              configObject
            );
          }

          likeBtn.textContent =
            likeBtn.textContent == "Like 👍" ? "Unlike" : "Like 👍";
        });
      }
      likedButton();

      book.users.forEach((person) => {
        const li = document.createElement("li");
        li.textContent = person.username;
        usersList.append(li);
      });
      img.src = book.img_url;
      title.textContent = `Title: ${book.title}`;
      subtitle.textContent = `Subtitle: ${book.subtitle}`;
      author.textContent = `Author: ${book.author}`;
      description.textContent = `Description: ${book.description}`;
      likeBtn.textContent = `Like 👍`;
      showPanel.append(
        img,
        title,
        subtitle,
        author,
        description,
        usersList,
        likeBtn
      );
    });
  }
});
// document.addEventListener("DOMContentLoaded", function () {
//   let currentBook;
//   fetch("http://localhost:3000/books")
//     .then((res) => res.json())
//     .then((data) => {
//       data.forEach((book) => {
//         bookGenList(book);
//       });
//     });

//   function bookGenList(book) {
//     const bookUl = document.getElementById("list");
//     const bookLi = document.createElement("li");
//     bookLi.textContent = book.title;
//     bookLi.addEventListener("click", () => {
//       bookInfo(book);
//     });
//     bookUl.append(bookLi);
//   }

//   function bookInfo(book) {
//     currentBook = book;
//     const bookPanelDiv = document.getElementById("show-panel");
//     bookPanelDiv.innerHTML = "";

//     const createTitle = document.createElement("h2");
//     createTitle.textContent = book.title;

//     const createSub = document.createElement("h3");
//     createSub.textContent = book.subtitle;

//     const createAuthor = document.createElement("h4");
//     createAuthor.textContent = book.author;

//     const createImg = document.createElement("img");
//     createImg.src = book.img_url;

//     const createDesc = document.createElement("p");
//     createDesc.textContent = book.description;

//     const createUlUsers = document.createElement("ul");
//     createUlUsers.setAttribute("title", "User Likes:");

//     const likeUsers = [...book.users];
//     likeUsers.forEach((users) => {
//       const userLi = document.createElement("li");
//       userLi.textContent = users.username;
//       createUlUsers.append(userLi);
//     });
//     const likeBtn = document.createElement("button");
//     let isUser = false;
//     fetch("http://localhost:3000/users")
//       .then((res) => res.json())
//       .then((data) => {
//         let rng = Math.floor(Math.random() * data.length);
//         const setUser = data[rng].id;
//         // const submittedUser = data[rng];
//         const newUser = {
//           id: setUser,
//           username: data[rng].username
//         }
//         const submittedUser = {
//           users: [...book.users, newUser]
//         }

//         console.log(setUser);
//         console.log(newUser);
//         console.log(submittedUser)
//         checkId(likeUsers, setUser);
//         function checkId(likeUsers, setUser) {
//           for (let i = 0; i < likeUsers.length; i++)
//             if (likeUsers[i].id === setUser) {
//               return (isUser = true);
//             }
//         }
//         const bookId = book.id;
//         likeBtn.textContent = isUser ? "Unlike" : "like";
//         likeBtn.addEventListener("click", () => {
//           if (isUser === false) {
//             console.log('yea')
//             fetch(`http://localhost:3000/books/${currentBook.id}`, {
//               method: "PATCH",
//               headers: {
//                 "Content-type": "application/json",
//                 Accept: "application/json",
//               },
//               body: JSON.stringify(submittedUser),
//             })
//               .then((res) => res.json())
//               .then((data) => {
//                 // likeUsers.push(submittedUser);
//                 console.log(data.users)
//               });
//           } else {
//             fetch(`http://localhost:3000/books/${setUser}`, {
//               method: "DELETE",
//               headers: {
//                 "Content-type": "application/json",
//               },
//             })
//               .then((res) => res.json())
//               .then((data) => {
//                 delete likeUsers[data[rng].id];
//               });
//           }
//         });
//       });

//     //likeBtn.addEventListener("click", () => {
//     // })
//     bookPanelDiv.append(
//       createImg,
//       createTitle,
//       createSub,
//       createAuthor,
//       createDesc,
//       createUlUsers,
//       likeBtn
//     );
//   }
// });
