const defaultUser = {
  email: 'sandra@example.com',
  avatarUrl: 'https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/06.png'
};

export default {
  _user: defaultUser,
  loggedIn() {
    return !!this._user;
  },

 
};
