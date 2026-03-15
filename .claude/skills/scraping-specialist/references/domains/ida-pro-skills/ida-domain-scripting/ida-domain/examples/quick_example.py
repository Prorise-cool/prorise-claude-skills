import argparse

from ida_domain import Database

parser = argparse.ArgumentParser(description='Quick Usage Example')
parser.add_argument('-f', '--input-file', type=str, required=True)
args = parser.parse_args()

# Open any binary format IDA supports
with Database() as db:
    if db.open(args.input_file):
        # Pythonic iteration over functions
        for func in db.functions:
            print(f'{func.name}: {len(list(db.functions.get_instructions(func)))} instructions')
