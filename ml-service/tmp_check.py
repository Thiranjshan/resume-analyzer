import importlib
m = importlib.import_module('tests.test_skill_extraction')
print('imported', m)
print(m.test_finds_known_skill)
