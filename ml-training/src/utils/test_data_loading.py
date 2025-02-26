import pytest
from src.data.generator import generate_synthetic_data

def test_data_generation():
    df = generate_synthetic_data(samples=100)
    assert len(df) == 100
    assert 'difficulty' in df.columns