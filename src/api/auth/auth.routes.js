const {
    signinSchema,
    signupSchema,
    updateSchema,
    verifyEmailSchema,
} = require("./auth.validators");
const Role = require("../../constants/roles");
const router = require("express").Router();
const AuthService = require("../../services/auth.service");
const { Auth } = require("../../_middlewares/auth");


module.exports = router;

router.post("/login", signinSchema, login);
router.post("/register", signupSchema, register);
router.post("/verify-email", verifyEmailSchema, verifyEmail);
router.get("/", Auth([Role.admin]), getAll);
router.get("/:id", Auth(), getById);
router.post("/create-staff", Auth([Role.admin]), signupSchema, create);
router.patch("/:id", Auth(), updateSchema, update);
router.delete("/:id", Auth(), _delete);


function login(req, res, next) {
    const { email, password } = req.body;
    AuthService.login(email, password)
        .then(({ user, token }) => {
            res.json({ user, token });
        })
        .catch(next);
}

function register(req, res, next) {
    req.body.role = Role.user;

    AuthService.register(req.body, req.hostname)
        .then(({ user, token }) => {
            return res.status(201).json({
                user,
                token,
                message:
                    "Registration successfull, please check your email for verification instructions",
            });
        })
        .catch(next);
}
// TODO DEPRECATE
function registerStaff(req, res, next) {
    req.body.role = req.body.role || Role.admin;
    AuthService.register(req.body, req.hostname)
        .then(({ user, token }) => {
            return res.json({
                user,
                token,
                message:
                    "Registration successfull, please check your email for verification instructions",
            });
        })
        .catch(next);
}

function verifyEmail(req, res, next) {
    AuthService.verifyEmail(req.body)
        .then(() => res.json({ message: "Verification successfull" }))
        .catch(next);
}

function getAll(req, res, next) {
   // CHECK FOR NEXTPAGE 
   let nextPage = null;

   if(req.body.nextPage){
    nextPage = req.body.nextPage;
   }

    AuthService.getAll(nextPage)
        .then((accounts) => res.json(accounts))
        .catch(next);
}

function getById(req, res, next) {
    // users can get their own account and admin can get any account
    const id = parseInt(req.params.id);
    if (id !== req.user.id && req.user.role !== Role.admin) {
        return res.status(401).json({ message: "Unathorized" });
    }

    AuthService.getById(id)
        .then((account) => (account ? res.json(account) : res.sendStatus(404)))
        .catch(next);
}

function create(req, res, next) {
    req.body.role = Role.staff;
    AuthService.create(req.body, req.hostname)
        .then((account) => res.json(account))
        .catch(next);
}

function update(req, res, next) {
    // users can update their accounts and admin can update any account
    const id = parseInt(req.params.id);
    if (Number(req.params.id) !== req.user.id && req.user.role !== Role.admin) {
        return res.status(401).json({ message: "Unathorized" });
    }

    AuthService.update(id, req.body)
        .then((account) => res.json(account))
        .catch(next);
}

function _delete(req, res, next) {
    // users can delete their accounts and admin can update any account
    const id = parseInt(req.params.id);
    if (Number(req.params.id) !== req.user.id && req.user.role !== Role.admin) {
        return res.status(401).json({ message: "Unathorized" });
    }

    AuthService._delete(id)
        .then(() =>
            res.json({
                message: "Account deleted successfully",
                id: req.params.id,
            })
        )
        .catch(next);
}
