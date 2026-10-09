export const ensureAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
        return res.status(401).json({
            message: 'Authentication required'
        });
    }

    next();
};


export const requireRole = (...allowedRoles) => {
    return (req, res, next) => {

        if (!req.user) {
            return res.status(401).json({
                message: 'Authentication required'
            });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                message: 'Forbidden'
            });
        }

        next();
    };
};

export const requireSelfOrAdmin = (req, res, next) => {

    if (!req.user) {
        return res.status(401).json({
            message: 'Authentication required'
        });
    }

    const requestedUserId = req.params.userId;
    const loggedInUserId = req.user._id.toString();

    if (
        loggedInUserId !== requestedUserId &&
        req.user.role !== 'Admin'
    ) {
        return res.status(403).json({
            message: 'You are not authorized to access these devices'
        });
    }

    next();
};
