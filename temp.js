login: async (req, res) => {
    let result = {};
    const { name, password } = req.body;
    try {
      const user = await User.findOne({ name });
      if (user) {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          const token = generateToken(user.id);
          result.user = user;
          result.token = token;
        } else {
          result.error = "Authentication error";
        }

        // match ? (result.user = user) : (result.error = "Authentication error");
        res.send(result);
      }
      result.error = "User does not exist";
      res.send(result);
    } catch (error) {
      result.error = error;
      res.send(result);
    }
  },