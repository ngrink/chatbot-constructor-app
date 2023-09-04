from pydantic import BaseModel


class Config(BaseModel):
    flows: object
    nlu: object
    database: object
    newsletters: object
