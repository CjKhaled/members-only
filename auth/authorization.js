function isGuest(req, res, next) {
    if (req.isAuthenticated() && req.user.memberstatus === 'guest') {
        next()
    } else {
        res.status(401).json({ msg: "You aren't authorized to view this resource."})
    }
}

function isMember(req, res, next) {
    if (req.isAuthenticated() && req.user.memberstatus === 'member') {
        next()
    } else {
        res.status(401).json({ msg: "You aren't authorized to view this resource."})
    }
}

function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.memberstatus === 'admin') {
        next()
    } else {
        res.status(401).json({ msg: "You aren't authorized to view this resource."})
    }
}