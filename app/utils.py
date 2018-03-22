def cut_to_model(data, model):
    ret = {}
    for k, v in data.iteritems():
        if k in model:
            ret[k] = v
    return ret


def update_from_args(entity, args):
    for k in args:
        setattr(entity, k, args[k])
