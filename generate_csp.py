#!/usr/bin/env python3

import argparse
from pathlib import Path
import re
import hashlib
import base64
import logging

logging.basicConfig(format='%(asctime)s - %(levelname)s - %(message)s',
                    datefmt='%Y-%m-%d %H:%M:%S', level=logging.DEBUG)

if __name__ == '__main__':
    PARSER = argparse.ArgumentParser(
        description='Parse a bundled JavaScript file while looking for <style></style> tags, generate hashes and create a final Netlify configuration using a base configuration file')
    required_group = PARSER.add_argument_group('required arguments')
    required_group.add_argument(
        '-j', '--js', required=True, type=Path, help='File with JavaScript code')
    required_group.add_argument(
        '-n', '--netlify', required=True, type=Path, help='File with Netlify base config')
    required_group.add_argument('-o', '--output', required=True, type=Path,
                                help='Directory path to output final Netlify configuration')
    ARGS = PARSER.parse_args()

    # Parse JavaScript code first.
    with open(ARGS.js, 'r') as js_file:
        js_code = js_file.read()
        style_pattern = re.compile(r'\<style\>(.*?)\<\/style\>')
        style_blocks = style_pattern.findall(js_code)

        output_csp = ''

        for block in style_blocks:
            digest_bytes = base64.b64encode(hashlib.sha256(
                block.replace('\\n', '\n').encode('utf-8')).digest())
            digest_str = digest_bytes.decode('utf-8')
            output_csp += ' \'sha256-' + digest_str + '\''

        logging.debug('Output CSP:%s', output_csp)

    # Use the base Netlify configuration to build the new one.
    with open(ARGS.netlify, 'r') as netlify_base_file, open(ARGS.output, 'w') as output_file:
        csp_pattern = re.compile(r'style-src\s\'self\'(.*?)\;\sreport-uri')

        output = netlify_base_file.read()
        logging.debug('File Output Before:%s', output)

        output = re.sub(csp_pattern, 'style-src \'self\'' + output_csp + '; report-uri', output)
        logging.debug('File Output After:%s', output)

        output_file.write(output)

    logging.info('Netlify configuration file created successfully!')
