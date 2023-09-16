import uuid

print(uuid.uuid5(uuid.NAMESPACE_OID, str(uuid.getnode())))