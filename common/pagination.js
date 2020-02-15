const pagination =  {
    setOffsetLimitDefault: function(args){
        if(! args.limit)
            args.limit = 10;
        if(! args.offset)
            args.offset = 0;
        return args;
    }
}
module.exports = pagination